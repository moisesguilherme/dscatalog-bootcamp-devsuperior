package com.devsuperior.dscatalog.tests.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

// vai carregar somente os componentes da JPA (spring data JPA) 
// que são os componentes necessarios para rodar esse testes
// não tem necessidade de carregar todo servidor web, só os componentes 
// do Spring DATA JPA  

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository;
	
	
	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPCGamerProducts;
	private long countCategory3Product;
	private PageRequest pageRequest;
	
		
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		countCategory3Product = 23L;
		pageRequest = PageRequest.of(0, 10);
	}
	
	@Test
	public void findShouldReturnAllProductWhenCategoryInformed() {
		
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(3L, null));
		
		Page<Product> result = repository.find(categories, "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategory3Product, result.getTotalElements());
	}
		
	
	@Test
	public void findShouldReturnAllProductWhenCategoryNotInformed() {
		List<Category> categories = null;
		
		Page<Product> result = repository.find(categories, "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	
	@Test
	public void findShouldReturnNothingWhenNameDoesNotExist() {
		
		String name = "Camera";
				
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertTrue(result.isEmpty());
	}
	
	
	
	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {
		
		String name = "";
				
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		
		String name = "pc gAMeR";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		String name = "PC Gamer";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId()); 
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());		
		Assertions.assertTrue(result.isPresent());
		// Será que o JPA realmente está buscando um objeto
		// pelo fato do objeto já estar em memória, ele vai buscar a mesma referência
		// Ver se o result é o mesmo objeto do product é a mesma referência
		// ver se está funcionando o cache da JPA (o mapa de identidade que faz o cache dos objetos)
		Assertions.assertSame(result.get(), product);
	}
	
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
				
		repository.deleteById(existingId);

		/* O findById do JPA Repository ele retorna um optional, 
		* o id existindo ou não
		* ele vai instânciar um objeto optional, só que dentro do
		* optional pode ter ou não um produto, por isso precisa chamar o
		* isPresent. Para saber se existe ou não.
		*/ 
		Optional<Product> result = repository.findById(existingId);
		
		// Tem q dar false (não existe)
		Assertions.assertFalse(result.isPresent());	
	}
	
	@Test
	public void deleteShouldIdThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
		
	}

}
