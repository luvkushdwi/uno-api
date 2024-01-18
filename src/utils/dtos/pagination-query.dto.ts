import { Column } from "typeorm";
import { IsIn, Min } from 'class-validator';
import { SORT_ORDER, SORT_ORDER_LIST, STATUS } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationQueryDto {
  @Column({nullable: true})
  @ApiProperty({ required: false })
  keyword?: string;

  @Column({nullable: true})
  @ApiProperty({ required: false })
  limit?: number;

  @Column({nullable: true})
  @ApiProperty({ required: false })
  page?: number;

  @Column({nullable: true})
  @ApiProperty({ required: false })
  sortBy?: string;

  @Column({nullable: true})
  @ApiProperty({ required: false })
  @IsIn(SORT_ORDER_LIST)
  sortOrder?: string = SORT_ORDER['ASC'];

  @Column({nullable: true})
  @ApiProperty({ required: false })
  isDropdown?: boolean = false;

  @Column({nullable: true})
  @ApiProperty({ required: false })
  status?: string = STATUS['ACTIVE'];
}
