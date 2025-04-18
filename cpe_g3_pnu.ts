/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * Motor directions
 */
enum cpeMotor {
    //% block="Forward"
    Forward,
    //% block="Backward"
    Backward
}

/**
 * Turn directions
 */
enum cpeTurn {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

/**
 * Spin directions
 */
enum cpeSpin {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

/**
 * Servo channels
 */
enum cpeServo {
    //% block="SV1"
    SV1,
    //% block="SV2"
    SV2
}

/**
 * ADC channels
 */
enum cpeReadADC {
    //% block="ADC0"
    ADC0 = 0,
    //% block="ADC1"
    ADC1 = 1,
    //% block="ADC2"
    ADC2 = 2,
    //% block="ADC3"
    ADC3 = 3,
    //% block="ADC4"
    ADC4 = 4,
    //% block="ADC5"
    ADC5 = 5,
    //% block="ADC6"
    ADC6 = 6,
    //% block="ADC7"
    ADC7 = 7
}

/**
 * Motor channel
 */
enum cpeMotorCH {
    //% block="M1"
    M1,
    //% block="M2"
    M2
}

/**
* Custom motor control blocks for CPE_PNU
*/
//% block="CPE PNU" weight=100 color=#FFA500 icon="\uf085"
namespace cpe_pnu {

    /**
     * Control individual motor channel and direction.
     * @param Channel Motor channel
     * @param Direction Motor direction
     * @param Speed Speed (0 to 100), eg: 50
     */
    //% blockId="cpe_setMotor" block="setMotor %cpeMotorCH|Direction %cpeMotor|Speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=100
    export function setMotor(Channel: cpeMotorCH, Direction: cpeMotor, Speed: number): void {
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)

        if (Channel == cpeMotorCH.M1 && Direction == cpeMotor.Forward) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
        }
        else if (Channel == cpeMotorCH.M2 && Direction == cpeMotor.Forward) {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Channel == cpeMotorCH.M1 && Direction == cpeMotor.Backward) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
        }
        else if (Channel == cpeMotorCH.M2 && Direction == cpeMotor.Backward) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }

    /**
     * Turn the robot by running one motor.
     * @param Turn Direction to turn, eg: cpeTurn.Left
     * @param speed Speed (0 to 100), eg: 50
     */
    //% blockId="cpe_turn" block="Turn %cpeTurn|Speed %speed"
    //% speed.min=0 speed.max=100
    export function Turn(Turn: cpeTurn, speed: number): void {
        let motorspeed = pins.map(speed, 0, 100, 0, 1023)

        if (Turn == cpeTurn.Left) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Turn == cpeTurn.Right) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }

    /**
     * Spin the robot in place (left or right).
     * @param Spin Direction to spin, eg: cpeSpin.Left
     * @param speed Speed (0 to 100), eg: 50
     */
    //% blockId="cpe_spin" block="Spin %cpeSpin|Speed %speed"
    //% speed.min=0 speed.max=100
    export function Spin(Spin: cpeSpin, speed: number): void {
        let motorspeed = pins.map(speed, 0, 100, 0, 1023)

        if (Spin == cpeSpin.Left) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Spin == cpeSpin.Right) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }

    /**
     * Stop both motors.
     */
    //% blockId="cpe_motorStop" block="Motor Stop"
    export function MotorStop(): void {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.analogWritePin(AnalogPin.P16, 0)
    }

    /**
     * Control Servo 1 or 2 set degree between 0 - 180
     * @param Degree servo degree 0-180, eg: 90
     */
    //% blockId="cpe_Servo" block="Servo %cpeServo|Degree %Degree"
    //% Degree.min=0 Degree.max=180
    //% weight=75
    export function Servo(Servo: cpeServo, Degree: number): void {
        if (Servo == cpeServo.SV1) {
            pins.servoWritePin(AnalogPin.P8, Degree)
        }
        else if (Servo == cpeServo.SV2) {
            pins.servoWritePin(AnalogPin.P12, Degree)
        }
    }

    /**
     * Set Servo to free rotation
     * @param Servo Servo to stop
     */
    //% blockId="cpe_ServoStop" block="Servo Stop %cpeServo"
    //% weight=70
    export function ServoStop(Servo: cpeServo): void {
        if (Servo == cpeServo.SV1) {
            pins.servoSetPulse(AnalogPin.P8, 0)
        }
        else if (Servo == cpeServo.SV2) {
            pins.servoSetPulse(AnalogPin.P12, 0)
        }
    }

    /**
     * Read ADC channel 0-7
     * @param ReadADC ADC channel to read
     */
    //% blockId="cpe_readADC" block="Read %cpeReadADC"
    //% weight=60
    export function ReadADC(ReadADC: cpeReadADC): number {
        pins.i2cWriteNumber(72, ReadADC, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt16BE, false)
    }
}
