import { Module } from '@nestjs/common';
import { SwitchGateway } from './switch.gateway';

@Module({
  providers: [SwitchGateway]
})
export class SwitchModule {}
