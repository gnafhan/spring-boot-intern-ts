package com.xtramile.intern_project.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

/**
 * Explicit DataSource configuration to bypass Spring Boot auto-configuration issues.
 * This ensures the database connection uses the exact credentials specified.
 * 
 * Reads from environment variables directly using System.getenv() to bypass
 * any Spring property resolution issues.
 */
@Configuration
public class DataSourceConfig {

    private final Environment env;

    public DataSourceConfig(Environment env) {
        this.env = env;
    }

    @Bean
    @Primary
    public DataSource dataSource() {
        // Try multiple ways to get the values
        String jdbcUrl = getConfigValue("SPRING_DATASOURCE_URL", "spring.datasource.url", "jdbc:postgresql://postgres:5432/interndb");
        String username = getConfigValue("SPRING_DATASOURCE_USERNAME", "spring.datasource.username", "internuser");
        String password = getConfigValue("SPRING_DATASOURCE_PASSWORD", "spring.datasource.password", "internpass");

        // Log connection details for debugging
        System.out.println("==============================================");
        System.out.println("DataSource Configuration (Explicit):");
        System.out.println("  JDBC URL: " + jdbcUrl);
        System.out.println("  Username: " + username);
        System.out.println("  Password: " + (password != null ? "[SET - " + password.length() + " chars: " + password + "]" : "[NULL]"));
        System.out.println("  Source: Environment variables / defaults");
        System.out.println("==============================================");

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName("org.postgresql.Driver");
        
        // Connection pool settings
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        
        // Connection validation
        config.setConnectionTestQuery("SELECT 1");
        
        // Additional PostgreSQL optimizations
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        
        return new HikariDataSource(config);
    }

    /**
     * Get configuration value from multiple sources:
     * 1. System environment variable (ENV_NAME)
     * 2. Spring environment property (property.name)
     * 3. Default value
     */
    private String getConfigValue(String envName, String propertyName, String defaultValue) {
        // First try direct environment variable
        String value = System.getenv(envName);
        if (value != null && !value.isEmpty()) {
            System.out.println("  Config [" + envName + "]: from System.getenv()");
            return value;
        }
        
        // Then try Spring environment
        value = env.getProperty(envName);
        if (value != null && !value.isEmpty()) {
            System.out.println("  Config [" + envName + "]: from Spring env (env name)");
            return value;
        }
        
        value = env.getProperty(propertyName);
        if (value != null && !value.isEmpty()) {
            System.out.println("  Config [" + envName + "]: from Spring env (property name)");
            return value;
        }
        
        System.out.println("  Config [" + envName + "]: using default");
        return defaultValue;
    }
}
