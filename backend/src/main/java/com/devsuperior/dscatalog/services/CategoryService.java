package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;

@Service //ou @component, @repository
public class CategoryService {
	
	//Quem gerencia as instâncias dos objetos é o SPRING
	//Injeção de indeoendência automatizado.
	
	@Autowired
	private CategoryRepository repository;	
	
	//Transactional (garantir a integridade da transação)
	//readyOnly, Evita "lock" no bando de dados, não precisa travar o banco só para ler, melhora a performace
	
	@Transactional(readOnly = true)   
	public List<CategoryDTO> findAll() {
		List<Category> list = repository.findAll();
		
		// map transforma cada elemento
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}
		
	
}
