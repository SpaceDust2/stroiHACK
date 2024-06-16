import os
import json
import collections
from datasets import load_dataset
from PIL import Image

# Определение категорий
CATEGORIES = [
    'barricade', 'dumpster', 'excavators', 'gloves', 'hardhat', 'mask', 
    'no-hardhat', 'no-mask', 'no-safety vest', 'person', 'safety net', 
    'safety shoes', 'safety vest', 'dump truck', 'mini-van', 'truck', 'wheel loader'
]

# Загрузка датасета
ds = load_dataset("keremberke/construction-safety-object-detection", name="full")

# Создание структуры папок
data_dir = 'construction_safety_data'
os.makedirs(os.path.join(data_dir, 'images/train'), exist_ok=True)
os.makedirs(os.path.join(data_dir, 'images/validation'), exist_ok=True)
os.makedirs(os.path.join(data_dir, 'images/test'), exist_ok=True)
os.makedirs(os.path.join(data_dir, 'labels/train'), exist_ok=True)
os.makedirs(os.path.join(data_dir, 'labels/validation'), exist_ok=True)
os.makedirs(os.path.join(data_dir, 'labels/test'), exist_ok=True)

def save_yolo_format(ds, split):
    for i, example in enumerate(ds[split]):
        img = example['image']
        img_path = os.path.join(data_dir, f'images/{split}/{split}_{i}.jpg')
        img.save(img_path)

        label_path = os.path.join(data_dir, f'labels/{split}/{split}_{i}.txt')
        with open(label_path, 'w') as f:
            for obj in example['objects']:
                bbox = obj['bbox']
                category = obj['category']
                x_center = (bbox[0] + bbox[2] / 2) / example['width']
                y_center = (bbox[1] + bbox[3] / 2) / example['height']
                width = bbox[2] / example['width']
                height = bbox[3] / example['height']
                f.write(f"{CATEGORIES.index(category)} {x_center} {y_center} {width} {height}\n")

# Сохранение данных в формате YOLO
save_yolo_format(ds, 'train')
save_yolo_format(ds, 'validation')
save_yolo_format(ds, 'test')
