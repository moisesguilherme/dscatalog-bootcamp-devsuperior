package com.devsuperior.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;

@Service //@component, @repository
public class CategoryService {
	
	//Quem gerencia as instâncias dos objetos é o SPRING
	//Injeção de indeoendência automatizado.
	
	@Autowired
	private CategoryRepository repository;	
	
	public List<Category> findAll() {
		return repository.findAll();
	}
		
	
}
