package com.example.project.controller;
import com.example.project.exceptions.ResourceNotFoundException;
import com.example.project.model.EditorContent;
import com.example.project.service.EditorContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/editor")
public class EditorContentController {

    @Autowired
    private EditorContentService editorContentService;

    @PostMapping("/save")
    public EditorContent saveContent(@RequestBody EditorContent content) {
        return editorContentService.saveContent(content);
    }

    @GetMapping("/{id}")
    public EditorContent getContentById(@PathVariable Long id) {
        return editorContentService.getContentById(id);
    }

    @PutMapping("/update/{id}")
    public EditorContent updateContent(@PathVariable Long id, @RequestBody EditorContent updatedContent) {
        EditorContent existingContent = editorContentService.getContentById(id);
        if (existingContent == null) {
            throw new ResourceNotFoundException("EditorContent");
        }

        existingContent.setContent(updatedContent.getContent());

        return editorContentService.saveContent(existingContent);
    }

    
}
