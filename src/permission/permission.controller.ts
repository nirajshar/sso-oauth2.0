import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create.dto';
import { UpdatePermissionDto } from './dto/update.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService){}

    @Get()
    async getAllPermissions() {
        return await this.permissionService.getAllPermissions();
    }

    @Post()
    async createOnePermission(@Body() createPermissionDto: CreatePermissionDto) {
        return await this.permissionService.createOnePermission(createPermissionDto);
    }

    @Get('/:id')
    async getOnePermission(@Param('id') id: string) {
        return await this.permissionService.getOnePermission(id);
    }   

    @Put('/:id')
    async updateOnePermission(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto ) {
        return await this.permissionService.updateOnePermission(id, updatePermissionDto);
    }

    @Delete('/:id')
    async deleteOnePermission(@Param('id') id: string) {
        return await this.permissionService.deleteOnePermission(id);
    }
}
