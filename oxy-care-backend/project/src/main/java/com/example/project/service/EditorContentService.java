package com.example.project.service;
import com.example.project.model.EditorContent;
import com.example.project.repository.EditorContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditorContentService {

    @Autowired
    private EditorContentRepository editorContentRepository;

    public EditorContent saveContent(EditorContent content) {
        return editorContentRepository.save(content);
    }

    public EditorContent getContentById(Long id) {
        return editorContentRepository.findById(id).orElse(null);
    }

    // Add other methods as needed
}

