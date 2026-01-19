package com.xtramile.intern_project.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI studentManagementOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Development Server");
        
        Server prodServer = new Server();
        prodServer.setUrl("https://api.production.com");
        prodServer.setDescription("Production Server");
        
        Contact contact = new Contact();
        contact.setEmail("support@xtramile.com");
        contact.setName("Xtramile Support");
        contact.setUrl("https://www.xtramile.com");
        
        License mitLicense = new License()
                .name("MIT License")
                .url("https://choosealicense.com/licenses/mit/");
        
        Info info = new Info()
                .title("Student Management API")
                .version("1.0.0")
                .contact(contact)
                .description("REST API for managing college students with CRUD operations, search, pagination, and comprehensive validation.")
                .termsOfService("https://www.xtramile.com/terms")
                .license(mitLicense);
        
        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer));
    }
}
