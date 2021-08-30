import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { hasRoles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateRoleDto } from './dto/create.dto';
import { RoleOwnsPermissions } from './dto/roleOwnsPermissions.dto';
import { UpdateRoleDto } from './dto/update.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService){}

    @Get()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getAllRoles() {
        return await this.roleService.getAllRoles();
    }

    @Post()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async createOneRole(@Body() createRoleDto: CreateRoleDto) {
        return await this.roleService.createOneRole(createRoleDto);
    }

    @Get('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getOneRole(@Param('id') id: string) {
        return await this.roleService.getOneRole(id);
    }   

    @Put('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateOneRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto ) {
        return await this.roleService.updateOneRole(id, updateRoleDto);
    }

    @Delete('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async deleteOneRole(@Param('id') id: string) {
        return await this.roleService.deleteOneRole(id);
    }

    // ## ACL
    // Grant permission to Role   
    @Post('grant/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async grantPermissionsToRole(@Param('id') id: string, @Body() permissions: RoleOwnsPermissions[]) {
        return this.roleService.grantPermissionsToRole(id, permissions);
    }

    // Revoke permission from Role   
    @Post('revoke/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async revokePermissionsFromRole(@Param('id') id: string, @Body() permissions: RoleOwnsPermissions[]) {
        return this.roleService.revokePermissionsFromRole(id, permissions);
    }

}
