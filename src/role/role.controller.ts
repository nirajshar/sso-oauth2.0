import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoleDto } from './dto/create.dto';
import { RoleOwnsPermissions } from './dto/roleOwnsPermissions.dto';
import { UpdateRoleDto } from './dto/update.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllRoles() {
        return await this.roleService.getAllRoles();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createOneRole(@Body() createRoleDto: CreateRoleDto) {
        return await this.roleService.createOneRole(createRoleDto);
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getOneRole(@Param('id') id: string) {
        return await this.roleService.getOneRole(id);
    }   

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateOneRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto ) {
        return await this.roleService.updateOneRole(id, updateRoleDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOneRole(@Param('id') id: string) {
        return await this.roleService.deleteOneRole(id);
    }

    // ## ACL
    // Grant permission to Role   
    @Post('grant/:id')
    @UseGuards(AuthGuard('jwt'))
    async grantPermissionsToRole(@Param('id') id: string, @Body() permissions: RoleOwnsPermissions[]) {
        return this.roleService.grantPermissionsToRole(id, permissions);
    }

    // Revoke permission from Role   
    @Post('revoke/:id')
    @UseGuards(AuthGuard('jwt'))
    async revokePermissionsFromRole(@Param('id') id: string, @Body() permissions: RoleOwnsPermissions[]) {
        return this.roleService.revokePermissionsFromRole(id, permissions);
    }

}
