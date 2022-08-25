package com.codestates.coco.anonymousBoard.mapper;

import com.codestates.coco.anonymousBoard.domain.Anonymous;
import com.codestates.coco.anonymousBoard.domain.AnonymousReqDTO;
import com.codestates.coco.anonymousBoard.domain.AnonymousResDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnonymousMapper {
    AnonymousResDTO anonymousToAnonymousResDTO(Anonymous anonymous);
    Anonymous anonymousResDTOToAnonymous(AnonymousResDTO anonymousResDTO);

    AnonymousReqDTO anonymousToAnonymousReqDTO(Anonymous anonymous);

    Anonymous anonymousReqDTOToAnonymous(AnonymousReqDTO anonymousReqDTO);


}
