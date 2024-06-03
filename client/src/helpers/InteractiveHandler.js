export default class InteractiveHandler {

  constructor(scene) {
    scene.pickupCard.on('pointerdown', () => {
      scene.socket.emit("pickupCard", scene.socket.id);
      scene.pickupCard.disableInteractive();
    })

    scene.pickupCard.on('pointerover', () => {
      scene.pickupCard.setColor('#ff69b4');
    })

    scene.pickupCard.on('pointerout', () => {
      scene.pickupCard.setColor('#00ffff');
    })

  }
}