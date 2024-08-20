package com.example.project.repository;
import com.example.project.model.EditorContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditorContentRepository extends JpaRepository<EditorContent, Long> {
}
