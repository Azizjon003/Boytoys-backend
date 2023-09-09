import { HttpException, Injectable } from '@nestjs/common';
import { createBranchDto } from './dto/branch.dto';
import { Branch } from './branch.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class BranchService {
  async create(createBranchDto: createBranchDto) {
    const { name } = createBranchDto;
    const branch = await Branch.create({ name });

    return branch;
  }

  async getAll() {
    const branch = await Branch.findAll();
    if (branch.length === 0) throw new HttpException('Branches not found', 400);
    return branch;
  }

  async update(id: string, createBranchDto: createBranchDto) {
    const branch = await Branch.findOne({ where: { id } });
    if (!branch) {
      throw new HttpException('Branch Not Found', 400);
    }
    branch.name = createBranchDto.name || branch.name;
    await branch.save();

    return branch;
  }

  async delete(id: string) {
    const branch = await Branch.findOne({ where: { id } });
    if (!branch) {
      throw new HttpException('Branch Not Found', 400);
    }
    await branch.destroy();
    return branch;
  }
}
