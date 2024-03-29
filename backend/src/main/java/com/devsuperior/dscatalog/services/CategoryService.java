package com.devsuperior.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service //ou @component, @repository
public class CategoryService {
	
	//Quem gerencia as instâncias dos objetos é o SPRING
	//Injeção de indeoendência automatizado.
	
	@Autowired
	private CategoryRepository repository;	
	
	//Transactional (garantir a integridade da transação)
	//readyOnly, Evita "lock" no bando de dados, não precisa travar o banco só para ler, melhora a performace
	
	@Transactional(readOnly = true)   
	public Page<CategoryDTO> findAllPaged(PageRequest pageRequest) {
		Page<Category> list = repository.findAll(pageRequest);
		
		// map transforma cada elemento
		return list.map(x -> new CategoryDTO(x));
	}
	

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		// Optional Java 8 - evitar trabalhar com valor nulo.
		// Nunca vai ser nulo.
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new EntityNotFoundException("Entity not found"));		
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);		
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		// para atualizar vc usa o getOne, para nao ter que fazer 2 requisicoes no banco.
		//uma de busca e outra de atualizar
	   try {	
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);		
			return new CategoryDTO(entity);
	   }catch(EntityNotFoundException e) {
		   throw new ResourceNotFoundException("Id not found" + id);
	   }	  
	}

	//Nao coloca o transactional, precisa capturar uma excessao...
	// Integridade referencial, nao pode deletar a categoria se existe produto
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}		
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		} // integridade referencial
		catch(DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation"); 
		}
	}

}
