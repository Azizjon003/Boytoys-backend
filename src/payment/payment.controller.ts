import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { createPaymentsDto } from './dto/payments.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Get all payment' })
  @ApiResponse({ status: 200, type: [createPaymentsDto] })
  @Get('/')
  getAll() {
    return this.paymentService.getAll();
  }

  @ApiOperation({ summary: 'Create Payment' })
  @ApiResponse({ status: 200, type: createPaymentsDto })
  @Post('/')
  @UseGuards(AuthGuard)
  create(@Body(ValidationPipe) createPaymentsDto: createPaymentsDto) {
    return this.paymentService.create(createPaymentsDto);
  }

  @ApiOperation({ summary: 'Update Payment' })
  @ApiResponse({ status: 200, type: createPaymentsDto })
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  update(
    @Body(ValidationPipe) createPaymentsDto: createPaymentsDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.paymentService.update(createPaymentsDto, id);
  }

  @ApiOperation({ summary: 'Delete Payment' })
  @ApiResponse({ status: 200, type: Number })
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.delete(id);
  }

  @ApiOperation({ summary: 'Get Payment by id' })
  @ApiResponse({ status: 200, type: createPaymentsDto })
  @Get('/:id')
  @UseGuards(AuthGuard)
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.findOne(id);
  }
}
