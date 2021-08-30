import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { hasRoles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreatePermissionDto } from './dto/create.dto';
import { UpdatePermissionDto } from './dto/update.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService){}

    @Get()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getAllPermissions() {
        return await this.permissionService.getAllPermissions();
    }

    @Post()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async createOnePermission(@Body() createPermissionDto: CreatePermissionDto) {
        return await this.permissionService.createOnePermission(createPermissionDto);
    }

    @Get('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getOnePermission(@Param('id') id: string) {
        return await this.permissionService.getOnePermission(id);
    }   

    @Put('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateOnePermission(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto ) {
        return await this.permissionService.updateOnePermission(id, updatePermissionDto);
    }

    @Delete('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async deleteOnePermission(@Param('id') id: string) {
        return await this.permissionService.deleteOnePermission(id);
    }
}
