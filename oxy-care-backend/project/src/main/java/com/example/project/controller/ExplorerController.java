package com.example.project.controller;
import com.example.project.dto.ExplorerDTO;
import com.example.project.model.Explorer;
import com.example.project.service.ExplorerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/explorers")
public class ExplorerController {

    @Autowired
    private ExplorerService explorerService;

    @GetMapping("/all")
    public List<ExplorerDTO> getAllExplorers() {
        return explorerService.getAllExplorers();
    }

    @GetMapping("/{id}")
    public Explorer getExplorerById(@PathVariable Long id) {
        return explorerService.getExplorerById(id);
    }

    @PostMapping("/add")
    public Explorer addExplorer(@RequestBody Explorer explorer) {
        return explorerService.addExplorer(explorer);
    }

    @PutMapping("/update/{id}")
    public Explorer updateExplorer(@PathVariable Long id, @RequestBody Explorer explorer) {
        return explorerService.updateExplorer(id, explorer);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteExplorer(@PathVariable Long id) {
        return explorerService.deleteExplorer(id);
    }
}
