# Heureka-OpticShield – AI-Powered Intelligent Surveillance

Heureka-OpticShield is an AI-driven surveillance and public safety system that converts existing CCTV, drone, and bodycam networks into a real-time **threat detection, lost-person search, and smart alert** platform for large events (like Mahakumbh), campuses, and smart cities. It focuses on **safe and trusted AI** with strong emphasis on low false alerts, human oversight, and ethical deployment.[1][2]

***

## 🔍 Problem Statement

Traditional CCTV is mostly used **after** an incident as evidence. In high-density environments:

- Operators cannot monitor hundreds of live feeds in real time  
- Weapons, suspects, and missing persons disappear into crowds  
- Alerts are slow, fragmented, and often missed  
- Ground staff get vague, delayed information with no unified view  

OpticShield solves this by combining **live video AI** with **NFC-based smart alerts** and a **unified safety dashboard**.[2][1]

***

## 🚀 Key Features

- **Real-Time Threat Detection**  
  Detects weapons, suspicious objects, and anomalous behavior across CCTV, drones, and bodycams using state-of-the-art deep learning models (YOLO-based detection, SlowFast-like action recognition).[1]

- **Criminal & Person-of-Interest Flagging**  
  Uses face recognition and person re-identification (ArcFace-style embeddings + clothing + posture) to spot wanted individuals across multiple cameras.[1]

- **Lost & Found (Missing Person Search)**  
  Given a reference image, OpticShield searches live and recorded footage using **facial features, clothing, and body pose** to locate missing persons even in dense crowds.[1]

- **NFC-Based Smart Alerts**  
  NFC tags placed at strategic points allow staff/citizens to tap and raise contextual SOS (lost person, threat, PoI). The system auto-attaches location, camera context, and AI insights to an incident card.[2]

- **Unified Safety Dashboard**  
  Web dashboard showing:
  - Live multi-camera grid with AI overlays  
  - Incident timeline (threats, NFC alerts, missing persons)  
  - Heatmaps and search across events and identities  

- **False Alert Reduction & Trusted AI**  
  - Whitelist database of authorized weapon-carrying personnel  
  - Human-in-the-loop review for high-risk decisions  
  - Audit logs, role-based access, DPDP-aligned design[1]

***

## 🧱 Tech Stack

- **Backend:** FastAPI (Python), REST APIs, WebSockets  
- **AI Models:** YOLO (object/weapon detection), ArcFace-style face recognition, person Re-ID, action recognition (SlowFast-style)[1]
- **Computer Vision:** OpenCV, MediaPipe / similar landmark & pose tools  
- **Frontend:** React.js dashboard (live video, alerts, maps)  
- **Database & Infra:** PostgreSQL, Redis, object storage, Docker  

***

## ⚙️ High-Level Architecture

1. Ingest RTSP / video feeds from CCTV, drones, and bodycams  
2. Run AI pipelines (detection, recognition, re-ID, behavior analysis)  
3. Fuse results with whitelist/watchlist and context  
4. Trigger alerts + NFC events → central incident engine  
5. Display everything on a real-time operator dashboard with controls and logs[1]

***

***

## 📌 Use Cases

- Mass events (Mahakumbh, fairs, festivals) – lost child tracing, crowd threat detection  
- University / corporate campuses – safety, access control, incident tracking  
- Smart cities – integrated city surveillance and command centers[2]
