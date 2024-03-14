var context = new AudioContext();

function playSound() {
    var source = context.createBufferSource();
    source.buffer = dogBarkingBuffer;
    source.connect(context.destination);
    source.start(0);
}