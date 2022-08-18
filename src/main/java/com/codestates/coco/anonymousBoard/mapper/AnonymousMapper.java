package com.codestates.coco.anonymousBoard.mapper;

import com.codestates.coco.anonymousBoard.domain.Anonymous;
import com.codestates.coco.anonymousBoard.domain.AnonymousDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnonymousMapper {
    AnonymousDTO anonymousToAnonymousDTO(Anonymous anonymous);
    Anonymous anonymousDTOToAnonymous(AnonymousDTO anonymousDTO);
}
