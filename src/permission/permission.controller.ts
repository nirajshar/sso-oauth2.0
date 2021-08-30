import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePermissionDto } from './dto/create.dto';
import { UpdatePermissionDto } from './dto/update.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllPermissions() {
        return await this.permissionService.getAllPermissions();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createOnePermission(@Body() createPermissionDto: CreatePermissionDto) {
        return await this.permissionService.createOnePermission(createPermissionDto);
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getOnePermission(@Param('id') id: string) {
        return await this.permissionService.getOnePermission(id);
    }   

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateOnePermission(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto ) {
        return await this.permissionService.updateOnePermission(id, updatePermissionDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOnePermission(@Param('id') id: string) {
        return await this.permissionService.deleteOnePermission(id);
    }
}
