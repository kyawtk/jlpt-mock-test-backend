import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for simplicity (adjust for production)
  },
})
export class SwitchGateway {
  @WebSocketServer()
  server: Server;

  private switchState = false; // Default state of the switch

  // Handle frontend requests to toggle the switch
  @SubscribeMessage('toggleSwitch')
  handleToggleSwitch(): void {
    this.switchState = !this.switchState; // Toggle the state
    this.broadcastSwitchState();
  }

  // Handle requests to get the current switch state
  @SubscribeMessage('getSwitchState')
  handleGetSwitchState(): boolean {
    return this.switchState; // Send the current state back
  }

  // Broadcast the switch state to all connected clients
  private broadcastSwitchState(): void {
    this.server.emit('switchStateUpdated', { state: this.switchState });
  }
}
