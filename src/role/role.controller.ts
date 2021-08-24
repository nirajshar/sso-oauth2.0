import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRoleDto } from './dto/create.dto';
import { RoleOwnsPermissions } from './dto/roleOwnsPermissions.dto';
import { UpdateRoleDto } from './dto/update.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService){}

    @Get()
    async getAllRoles() {
        return await this.roleService.getAllRoles();
    }

    @Post()
    async createOneRole(@Body() createRoleDto: CreateRoleDto) {
        return await this.roleService.createOneRole(createRoleDto);
    }

    @Get('/:id')
    async getOneRole(@Param('id') id: string) {
        return await this.roleService.getOneRole(id);
    }   

    @Put('/:id')
    async updateOneRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto ) {
        return await this.roleService.updateOneRole(id, updateRoleDto);
    }

    @Delete('/:id')
    async deleteOneRole(@Param('id') id: string) {
        return await this.roleService.deleteOneRole(id);
    }

    // ## ACL
    // Grant permission to Role   
    @Post('grant/:id')
    async grantPermissionsToRole(@Param('id') id: string, @Body() permissions: RoleOwnsPermissions[]) {
        return this.roleService.grantPermissionsToRole(id, permissions);
    }

    // Revoke permission from Role   
    @Post('revoke/:id')
    async revokePermissionsFromRole(@Param('id') id: string, @Body() permissions: RoleOwnsPermissions[]) {
        return this.roleService.revokePermissionsFromRole(id, permissions);
    }

}
