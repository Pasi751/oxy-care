//package com.example.project.component;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.util.ResourceUtils;
//
//import com.example.project.model.EditorContent;
//import com.example.project.repository.EditorContentRepository;
//
//import org.apache.commons.io.FileUtils;
//
//import java.io.File;
//import java.nio.charset.StandardCharsets;
//
//@Component
//public class EditorContentSave implements ApplicationRunner {
//
//    @Autowired
//    private EditorContentRepository editorContentRepository;
//
//    @Override
//    public void run(ApplicationArguments args) throws Exception {
//        File file = ResourceUtils.getFile("classpath:editor-content.txt");
//        String content = FileUtils.readFileToString(file, StandardCharsets.UTF_8);
//        EditorContent editorContent = new EditorContent();
//        editorContent.setContent(content);
//        editorContentRepository.save(editorContent);
//    }
//}
