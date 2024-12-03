package com.example.emotion_classifier.controller;

import com.example.emotion_classifier.controller.request.EmotionRequest;
import com.example.emotion_classifier.controller.response.EmotionResponse;
import com.example.emotion_classifier.service.PythonModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emotion")
public class EmotionClassificationController {

    @Autowired
    private PythonModelService pythonModelService;

    @PostMapping("/predict")
    public ResponseEntity<EmotionResponse> predictEmotion(@RequestBody EmotionRequest request) {
        // Predict emotion using Python model
        String predictedEmotion = pythonModelService.predictEmotion(request.getText());

        // Create and return response
        EmotionResponse response = new EmotionResponse(predictedEmotion);
        return ResponseEntity.ok(response);
    }
}