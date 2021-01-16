package com.devsuperior.dscatalog.services.exceptions;

public class ResourceNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	//RuntimeException ou Exception
	//Exception -> vc obrigatoriamente ter q tratar o compilador nao vai deixar vc
	//            nao tratar a excessao com o try catch ou propagar para o medo que chamou
	//RuntimeException e mais flexivel
	
	public ResourceNotFoundException(String msg) {
		super(msg);
	}	
}

