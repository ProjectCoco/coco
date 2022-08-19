package com.codestates.coco.anonymousBoard.mapper;

import com.codestates.coco.anonymousBoard.domain.Anonymous;
import com.codestates.coco.anonymousBoard.domain.AnonymousDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-08-19T17:34:26+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.15 (Oracle Corporation)"
)
@Component
public class AnonymousMapperImpl implements AnonymousMapper {

    @Override
    public AnonymousDTO anonymousToAnonymousDTO(Anonymous anonymous) {
        if ( anonymous == null ) {
            return null;
        }

        AnonymousDTO anonymousDTO = new AnonymousDTO();

        return anonymousDTO;
    }

    @Override
    public Anonymous anonymousDTOToAnonymous(AnonymousDTO anonymousDTO) {
        if ( anonymousDTO == null ) {
            return null;
        }

        Anonymous anonymous = new Anonymous();

        return anonymous;
    }
}
