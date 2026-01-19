package com.xtramile.intern_project.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Explicit DataSource configuration with raw JDBC test before HikariCP.
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
        // Use full container name to avoid DNS issues when on multiple networks
        String jdbcUrl = getConfigValue("SPRING_DATASOURCE_URL", "spring.datasource.url", "jdbc:postgresql://student-management-db:5432/interndb");
        String username = getConfigValue("SPRING_DATASOURCE_USERNAME", "spring.datasource.username", "internuser");
        String password = getConfigValue("SPRING_DATASOURCE_PASSWORD", "spring.datasource.password", "internpass");

        System.out.println("==============================================");
        System.out.println("DataSource Configuration:");
        System.out.println("  JDBC URL: " + jdbcUrl);
        System.out.println("  Username: " + username);
        System.out.println("  Password: '" + password + "'");
        System.out.println("  Password length: " + (password != null ? password.length() : 0));
        System.out.println("  Password hex: " + toHex(password));
        System.out.println("  Expected hex: " + toHex("internpass"));
        System.out.println("  Password match: " + "internpass".equals(password));
        System.out.println("==============================================");

        // TEST 1: Raw JDBC without password
        System.out.println("TEST 1: Trying raw JDBC WITHOUT password...");
        try {
            Connection conn = DriverManager.getConnection(jdbcUrl, username, "");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT 1");
            if (rs.next()) {
                System.out.println("  SUCCESS! Raw JDBC without password works!");
            }
            conn.close();
        } catch (Exception e) {
            System.out.println("  FAILED: " + e.getMessage());
        }

        // TEST 2: Raw JDBC with password
        System.out.println("TEST 2: Trying raw JDBC WITH password...");
        try {
            Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT 1");
            if (rs.next()) {
                System.out.println("  SUCCESS! Raw JDBC with password works!");
            }
            conn.close();
        } catch (Exception e) {
            System.out.println("  FAILED: " + e.getMessage());
        }

        // TEST 3: Raw JDBC with URL containing credentials
        String urlWithCreds = jdbcUrl + "?user=" + username + "&password=" + password;
        System.out.println("TEST 3: Trying raw JDBC with credentials in URL...");
        try {
            Connection conn = DriverManager.getConnection(urlWithCreds);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT 1");
            if (rs.next()) {
                System.out.println("  SUCCESS! Raw JDBC with URL credentials works!");
            }
            conn.close();
        } catch (Exception e) {
            System.out.println("  FAILED: " + e.getMessage());
        }

        // Now try HikariCP - use whichever method worked
        System.out.println("Creating HikariCP DataSource...");
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);
        
        return new HikariDataSource(config);
    }

    private String toHex(String s) {
        if (s == null) return "null";
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            sb.append(String.format("%02x ", (int) c));
        }
        return sb.toString().trim();
    }

    private String getConfigValue(String envName, String propertyName, String defaultValue) {
        String value = System.getenv(envName);
        if (value != null && !value.isEmpty()) {
            return value;
        }
        value = env.getProperty(envName);
        if (value != null && !value.isEmpty()) {
            return value;
        }
        value = env.getProperty(propertyName);
        if (value != null && !value.isEmpty()) {
            return value;
        }
        return defaultValue;
    }
}
