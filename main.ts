namespace SpriteKind {
    export const powerup = SpriteKind.create()
    export const mode = SpriteKind.create()
}
function enemy_death (enemy: Sprite) {
    enemy.destroy(effects.fire, 500)
    if (Math.percentChance(15)) {
        power_up = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . 8 8 6 6 6 6 6 6 6 8 8 . . . 
            . 8 6 6 6 6 6 6 6 6 6 6 6 8 . . 
            . 8 6 6 7 7 7 7 7 7 7 6 6 8 . . 
            8 6 6 7 7 7 7 7 7 7 7 7 6 6 8 . 
            8 6 6 7 7 7 . . . 7 7 7 6 6 8 . 
            8 6 6 7 7 . . . . . 7 7 6 6 8 . 
            8 6 6 7 7 . . . . . 7 7 6 6 8 . 
            8 6 6 7 7 . . . . . 7 7 6 6 8 . 
            8 6 6 7 7 7 . . . 7 7 7 6 6 8 . 
            8 6 6 7 7 7 7 7 7 7 7 7 6 6 8 . 
            . 8 6 6 7 7 7 7 7 7 7 6 6 8 . . 
            . 8 6 6 6 6 6 6 6 6 6 6 6 8 . . 
            . . 8 8 6 6 6 6 6 6 6 8 8 . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            `, SpriteKind.powerup)
        power_up.x = enemy.x
        power_up.y = enemy.y
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 6 6 6 6 . . . . 
        . . . . . 9 9 6 6 9 6 6 . . . . 
        . 9 9 9 9 9 9 9 9 9 6 6 . . . . 
        . . . . . . 9 9 9 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    if (_2fire && _2fire.lifespan > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 2 2 2 2 . . . 
            . . . . . . 3 2 2 3 2 2 2 . . . 
            . . 1 1 1 1 3 3 3 3 3 3 2 . . . 
            . . . . . . . 3 3 3 3 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 3 3 3 2 . . . . . 
            . . 1 1 3 3 2 3 3 3 3 3 2 . . . 
            . . . . . . 3 3 2 3 2 2 2 . . . 
            . . . . . . . . . 2 2 2 2 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 200, 0)
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemy_death(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup, function (sprite, otherSprite) {
    _2fire = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . 3 2 2 3 2 2 2 . . . 
        . . 1 1 1 1 3 3 3 3 3 3 2 . . . 
        . . . . . . . 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 3 3 2 . . . . . 
        . . 1 1 3 3 2 3 3 3 3 3 2 . . . 
        . . . . . . 3 3 2 3 2 2 2 . . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.mode)
    _2fire.setPosition(12, 12)
    _2fire.lifespan = 4000
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemy_death(otherSprite)
    scene.cameraShake(4, 500)
    statusbar2.value += -20
    if (statusbar2.value == 0) {
        mySprite.destroy(effects.fire, 500)
        pause(100)
        game.over(false)
    }
})
let spawn = 0
let statusbar: StatusBarSprite = null
let boomboom: Sprite = null
let _2fire: Sprite = null
let projectile: Sprite = null
let power_up: Sprite = null
let statusbar2: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    .........ff..........
    .........fbf.........
    .........fbdf........
    .........fbdf........
    .ff.......fbdf.......
    .fcf......fbdf.......
    .fcf......fbffff9....
    .fcbf....fbdddf......
    ffcbdfffffbdddfff....
    ffffffcbbffffffd1ff..
    fccccccbbbdddddd111ff
    ffffffbbbffffffd1ff..
    ffcbdfffffbdddfff....
    .fcbf....fbbddf......
    .fcf......fbffff9....
    .fcf......fbdf.......
    .ff.......fbdf.......
    .........fbdf........
    .........fbdf........
    .........fbf.........
    .........ff..........
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar2 = statusbars.create(145, 6, StatusBarKind.Health)
statusbar2.positionDirection(CollisionDirection.Top)
statusbar2.setLabel("HP")
let speed = 20
forever(function () {
    boomboom = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . f f f 
        . . . . . . . . . . . f f 2 2 2 
        . . . . . . . . . f f 2 2 2 2 f 
        . . . . . . . . f 4 2 4 4 f f . 
        . . . f f f f f 4 4 4 4 f f f . 
        . f f 5 5 4 f 5 5 4 4 f 2 2 2 f 
        f 5 5 5 4 4 f f f f f f 4 2 2 f 
        . f f f f f f f 5 5 4 4 f f f . 
        . . . . . . . . f 2 2 2 4 f f . 
        . . . . . . . . . f f 2 2 2 2 f 
        . . . . . . . . . . . f f 2 2 2 
        . . . . . . . . . . . . . f f f 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    boomboom.x = scene.screenWidth()
    boomboom.vx = 0 - speed
    boomboom.y = randint(10, scene.screenHeight() - 30)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(boomboom)
    pause(spawn)
})
game.onUpdateInterval(500, function () {
    speed += 5
    speed = Math.min(speed, 50)
    spawn += -200
    spawn = Math.max(spawn, 500)
})
