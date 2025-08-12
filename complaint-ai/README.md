

# 🧠 AI-Powered Complaint Categorization API

This is an AI-assisted backend service built with **FastAPI** (or Flask) that classifies customer complaints into predefined categories using a trained machine learning model. It's designed to be used in conjunction with a frontend complaint management system.

---

## 📦 Features

- Predicts complaint categories using a pre-trained ML model
- Simple API endpoint for integration with frontend (React/TS)
- Designed for fast deployment via Render
- Compatible with Netlify frontend setup

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/eternity961/complaint-ai.git
cd complaint-ai
```

### 2. Install dependencies

Make sure you have Python 3.9+ installed.

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
```

> If you don’t have a `requirements.txt` yet, run:
```bash
pip freeze > requirements.txt
```

---

### 3. Run the server

#### FastAPI
```bash
uvicorn main:app --reload
```

#### Flask
```bash
python main.py
```

The API will be available at:  
**http://127.0.0.1:8000/predict**

---

## 🧪 Sample Request

```json
POST /predict
Content-Type: application/json

{
  "description": "The electric meter is broken and not showing any readings."
}
```

### 🧠 Sample Response

```json
{
  "category": "Meter"
}
```

---

## 📁 Project Structure

```
.
├── model.pkl               # Trained ML model
├── main.py        # API server
├── requirements.txt
├── .gitignore
└── README.md
```

---

## 🌐 Deployment (Render)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com)
3. Select "New Web Service"
4. Choose your repo and set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command** (FastAPI): `uvicorn main:app --host=0.0.0.0 --port=10000`
   - **Runtime**: Python 3.9+
   - **Port**: `10000` (or as needed)

---

## 🤝 Integration

Once deployed, your main backend (e.g., Express or Node.js) can send a `POST` request to the deployed Render URL (e.g. `https://your-ai-service.onrender.com/predict`) and get the category prediction.

---

## ⚠️ Notes

- Keep your model file (`model.pkl`) under 100MB for free-tier Render.
- If you use `.env` for secrets or configs, don’t forget to add it to `.gitignore`.

---

## 🧠 Categories Handled

- Supply  
- Meter  
- Employee  
- Customer  
- EEU Service  
- Pre-paid  
- Billing

---

## Contributing

- Give it a star
