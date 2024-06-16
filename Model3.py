import streamlit as st
import cv2
import numpy as np
import torch
import time
import mediapipe as mp
import yolov5
from ultralyticsplus import YOLO

# Инициализация модулей MediaPipe для распознавания поз
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Загрузка моделей YOLOv5 и YOLOv8
model1 = YOLO("yolov8n.pt")  # Заменяем модель на YOLOv8
model2 = yolov5.load('keremberke/yolov5m-construction-safety')
model2.conf = 0.25
model2.iou = 0.45
model2.agnostic_nms = False
model2.multi_label = False
model2.max_det = 1000
model3 = YOLO('kittendev/YOLOv8m-smoke-detection')
model3.conf = 0.25
model3.iou = 0.45
model3.agnostic_nms = False
model3.max_det = 1000

# Функция для распознавания объектов на кадре
def detect_objects(frame, model, model_type='yolov5'):
    if model_type == 'yolov5':
        results = model(frame)
        objects_info = []
        for detection in results.xyxy[0]:
            x1, y1, x2, y2, conf, cls = detection.tolist()
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            label = model.names[int(cls)]
            objects_info.append(
                {'label': label, 'confidence': float(conf), 'bbox': (x1, y1, x2, y2)})
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, f'{label} {conf:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    elif model_type == 'yolov8':
        results = model(frame)
        objects_info = []
        for detection in results[0].boxes:
            x1, y1, x2, y2 = map(int, detection.xyxy[0])
            conf = detection.conf[0]
            cls = detection.cls[0]
            label = model.names[int(cls)]
            objects_info.append(
                {'label': label, 'confidence': float(conf), 'bbox': (x1, y1, x2, y2)})
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, f'{label} {conf:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    return frame, objects_info

# Функция для обработки видеопотока и вывода позы в реальном времени
def process_pose(frame, pose, sitting_time_threshold=0):
    sitting_start_time = None
    sitting = False
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)
    if results.pose_landmarks:
        mp_drawing.draw_landmarks(
            frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        landmarks = results.pose_landmarks.landmark
        if (landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y < landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y and
                landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y < landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y):
            if not sitting:
                sitting_start_time = time.time()
                sitting = True
            else:
                if time.time() - sitting_start_time >= sitting_time_threshold:
                    print("Строитель сидит уже {:.2f} секунд".format(
                        time.time() - sitting_start_time))
        else:
            sitting = False
    return frame

# Streamlit интерфейс
st.title('Обнаружение объектов и распознавание поз на видео с камеры устройства')

if 'run_detection' not in st.session_state:
    st.session_state.run_detection = False

def start_detection():
    st.session_state.run_detection = True

def stop_detection():
    st.session_state.run_detection = False

st.button('Запустить обнаружение объектов и распознавание поз',
        on_click=start_detection)
st.button('Остановить обнаружение объектов и распознавание поз',
        on_click=stop_detection)

if st.session_state.run_detection:
    # Настройка захвата видеопотока с камеры с максимальной частотой кадров
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FPS, 60)  # Установка максимальной частоты кадров (пример на 60 кадров в секунду)

    stframe1 = st.empty()
    stframe2 = st.empty()
    stframe3 = st.empty()
    stframe_pose = st.empty()

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while st.session_state.run_detection:
            ret, frame = cap.read()
            if not ret:
                break

            # Обработка кадра всеми моделями
            frame1, objects_info1 = detect_objects(
                frame.copy(), model1, model_type='yolov8')
            frame2, objects_info2 = detect_objects(
                frame.copy(), model2, model_type='yolov5')
            frame3, objects_info3 = detect_objects(
                frame.copy(), model3, model_type='yolov8')
            frame_pose = process_pose(frame.copy(), pose)

            # Проверка обнаружения дыма моделью model3 (YOLOv8 для дыма)
            if not objects_info3:
                # Если objects_info3 пустой (дым не обнаружен), выводим "Всё безопасно!"
                cv2.putText(frame3, "ALL IS SAFE!", (50, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

            # Преобразование изображений OpenCV в формат, поддерживаемый Streamlit
            frame1_rgb = cv2.cvtColor(frame1, cv2.COLOR_BGR2RGB)
            frame2_rgb = cv2.cvtColor(frame2, cv2.COLOR_BGR2RGB)
            frame3_rgb = cv2.cvtColor(frame3, cv2.COLOR_BGR2RGB)
            frame_pose_rgb = cv2.cvtColor(frame_pose, cv2.COLOR_BGR2RGB)

            # Отображение видео в Streamlit
            stframe1.image(frame1_rgb)
            stframe2.image(frame2_rgb)
            stframe3.image(frame3_rgb)
            stframe_pose.image(frame_pose_rgb)

    cap.release()
