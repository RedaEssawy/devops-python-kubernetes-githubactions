# Select the base image
FROM python:3.12-slim as base 

# Set the working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY requirements.txt .

# Upgrade pip 
RUN pip install --upgrade pip

# Install the requirements
RUN pip install --no-cache-dir -r requirements.txt

FROM base as final

# Copy the app files
COPY ./app ./app

# Expose the port the app runs on
EXPOSE 8000

# Run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]