import * as THREE from "three"

export class Game {
    private renderer: THREE.WebGLRenderer

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({ canvas })
    }

    // from the docs
    public example() {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        camera.position.z = 5
        const animate = () => {
            this.renderer.render(scene, camera)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
        }
        this.renderer.setAnimationLoop(animate)
    }
}
