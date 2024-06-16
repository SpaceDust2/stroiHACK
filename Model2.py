import cv2
import numpy as np
import time
import streamlit as st
import mediapipe as mp
from ultralyticsplus import YOLO
import yolov5

# Инициализация модулей MediaPipe для распознавания поз
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Загрузка моделей YOLOv5 и YOLOv8
model1 = YOLO("yolov8n.pt")  # Assuming "yolov8n.pt" is a valid model file

# Example for YOLOv5 model loading, adjust as per your actual model file
# Replace 'keremberke/yolov5n-construction-safety' with the correct model file path/name
try:
    model2 = yolov5.load('keremberke/yolov5m-construction-safety')
    model2.conf = 0.25
    model2.iou = 0.45
    model2.agnostic_nms = False
    model2.multi_label = False
    model2.max_det = 1000
except Exception as e:
    st.error(f"Error loading YOLOv5 model: {e}")

# Loading YOLOv8 model for smoke detection
model3 = YOLO('kittendev/YOLOv8m-smoke-detection')
model3.conf = 0.25
model3.iou = 0.45
model3.agnostic_nms = False
model3.max_det = 1000

# Функция для распознавания объектов на кадре с YOLOv5
def detect_objects_yolov5(frame, model):
    objects_info = []
    results = model(frame)
    for detection in results.xyxy[0]:
        x1, y1, x2, y2, conf, cls = detection.tolist()
        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
        label = model.names[int(cls)]
        objects_info.append(
            {'label': label, 'confidence': float(conf), 'bbox': (x1, y1, x2, y2)})
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, f'{label} {conf:.2f}', (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    return frame, objects_info

# Функция для распознавания объектов на кадре с YOLOv8
def detect_objects_yolov8(frame, model):
    objects_info = []
    results = model(frame)
    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            conf = box.conf.item()
            cls = int(box.cls.item())
            label = model.names[cls]
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

# Используем session state для отслеживания состояния обнаружения
if 'run_detection' not in st.session_state:
    st.session_state.run_detection = False

def start_detection():
    st.session_state.run_detection = True

def stop_detection():
    st.session_state.run_detection = False

start_button = st.button('Запустить обнаружение объектов и распознавание поз',
                         on_click=start_detection)
stop_button = st.button('Остановить обнаружение объектов и распознавание поз',
                        on_click=stop_detection)

if st.session_state.run_detection:
    cam_input = st.camera_input("Камера")

    if cam_input:
        # Получение изображения с камеры
        frame = cv2.imdecode(np.frombuffer(
            cam_input.getvalue(), np.uint8), cv2.IMREAD_COLOR)

        stframe1 = st.empty()
        stframe2 = st.empty()
        stframe3 = st.empty()
        stframe_pose = st.empty()

        with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
            frame = np.array(frame)

            # Обработка кадра всеми моделями
            frame1, objects_info1 = detect_objects_yolov8(frame.copy(), model1)
            frame2, objects_info2 = detect_objects_yolov5(frame.copy(), model2)
            frame3, objects_info3 = detect_objects_yolov8(frame.copy(), model3)
            frame_pose = process_pose(frame.copy(), pose)

            # Проверка обнаружения дыма моделью model3 (YOLOv8 для дыма)
            if not objects_info3:
                # Если objects_info3 пустой (дым не обнаружен), выводим "Всё безопасно!"
                cv2.putText(frame3, "All IS SAFE!", (50, 50),
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
