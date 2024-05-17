# Dockerfile for FastAPI backend
FROM python:3.11-slim

WORKDIR /app

# Install dependencies for MySQL
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements.txt to take advantage of Docker cache
COPY requirements.txt ./

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install --default-timeout=100 -r requirements.txt

# Copy the rest of the application code
COPY . .

# Default command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
