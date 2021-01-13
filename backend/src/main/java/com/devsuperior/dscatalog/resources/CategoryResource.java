package com.devsuperior.dscatalog.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.entities.Category;

//recurso (resource) é o conceito e o controlador (controller) a forma de implementar o conceito.

// Anotation - usar algo que já está implementado.
// pré processamento por baixo dos panos, na hora de complicar o projeto.

@RestController
@RequestMapping(value = "/categories") //Rota
public class CategoryResource {
	
	//Endpoints
	//objeto do spring que encapsula uma resposta HTTP
	
	@GetMapping
	public ResponseEntity<List<Category>> findAll() {
		//List é uma interface, vc prcisa insatanciar uma classe que implementa
		//uma interface.
		List<Category> list = new ArrayList<>();
		list.add(new Category(1L, "Books"));
		list.add(new Category(2L, "Electronics"));		
		return ResponseEntity.ok().body(list);
	}
	
	
}
