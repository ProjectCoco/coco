package com.codestates.coco.user.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RedisUtil {

    // refresh 토큰을 담을 기본 redis
    private final StringRedisTemplate redisTemplate;
    // refresh 토큰 재발급 시 사용할 blackList redis
    private final StringRedisTemplate redisBlackListTemplate;

    public RedisUtil(@Qualifier("redisTemplate") StringRedisTemplate redisTemplate, @Qualifier("redisBlacklistTemplate") StringRedisTemplate redisBlackListTemplate) {
        this.redisTemplate = redisTemplate;
        this.redisBlackListTemplate = redisBlackListTemplate;
    }

    public String getData(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setData(String key, String value) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    public void setDataExpire(String key, String value, long exp) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expire = Duration.ofSeconds(exp/1000);
        valueOperations.set(key, value, expire);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    public boolean hasData(String key) {
        return redisTemplate.hasKey(key);
    }

    public void setBlackList(String key, String value, long exp) {
        ValueOperations<String, String> valueOperations = redisBlackListTemplate.opsForValue();
        Duration expire = Duration.ofSeconds(exp/1000);
        valueOperations.set(key, value, expire);
    }

    public String getBlackList(String key) {
        ValueOperations<String, String> valueOperations = redisBlackListTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public Boolean hasBlackList(String key) {
        return redisBlackListTemplate.hasKey(key);
    }

    public void deleteBlackList(String key) {
        redisBlackListTemplate.delete(key);
    }
}
