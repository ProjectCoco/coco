package com.codestates.coco.user.config.security;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    public LettuceConnectionFactory rettuceConnectionFactory(int dbidx) {
        final RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(host);
        redisStandaloneConfiguration.setPort(port);
        redisStandaloneConfiguration.setDatabase(dbidx);
        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }

    @Bean
    @Qualifier("defaultRedisConnectionFactory")
    public RedisConnectionFactory defaultRedisConnectionFactory() {
        return rettuceConnectionFactory(0);
    }

    @Bean
    @Qualifier("blacklistRedisConnectionFactory")
    public RedisConnectionFactory blacklistRedisConnectionFactory() {
        return rettuceConnectionFactory(1);
    }

    @Bean
    @Qualifier("redisTemplate")
    public StringRedisTemplate redisTemplate() {
        StringRedisTemplate stringRedisTemplate = new StringRedisTemplate();
        stringRedisTemplate.setConnectionFactory(defaultRedisConnectionFactory());
        stringRedisTemplate.afterPropertiesSet();
        return stringRedisTemplate;
    }

    @Bean
    @Qualifier("redisBlacklistTemplate")
    public StringRedisTemplate redisBlacklistTemplate() {
        StringRedisTemplate stringRedisTemplate = new StringRedisTemplate();
        stringRedisTemplate.setConnectionFactory(blacklistRedisConnectionFactory());
        stringRedisTemplate.afterPropertiesSet();
        return stringRedisTemplate;
    }
}

