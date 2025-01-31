package com.example.emotion_classifier.service;

import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

@Service
public class PythonModelService {
    public String predictEmotion(String text) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "python3",
                    "/Users/viduthranaweera/Downloads/emotion-classifier/predict_emotion.py"
            );

            Process process = processBuilder.start();

            try (PrintWriter writer = new PrintWriter(
                    new OutputStreamWriter(process.getOutputStream(), StandardCharsets.UTF_8), true)) {
                writer.println(text);
            }

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String predictedEmotion = reader.readLine();

                process.waitFor();

                if (predictedEmotion == null || predictedEmotion.trim().isEmpty()) {
                    return "Unable to predict emotion";
                }
                return predictedEmotion.trim();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error in prediction";
        }
    }
}