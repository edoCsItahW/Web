/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import {
    Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, AmbientLight,
    PointLight, BoxGeometry, Mesh, MeshStandardMaterial, DoubleSide, MirroredRepeatWrapping,
    Light, Group, Vector3, BufferGeometry, Points, BufferAttribute,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";


namespace Tools {
    let speed = 1;

    export function followMouse(controls: PointerLockControls) {
        document.addEventListener('click', () => { controls.lock(); })
    }

    export function keyControl(velocity: Vector3, camera: PerspectiveCamera) {


        document.addEventListener('keydown', event => {
            switch (event.code) {
                case 'Digit1':
                    speed = 1;
                    break;
                case 'Digit2':
                    speed = 4;
                    break;
                case 'Digit3':
                    speed = 8;
                    break;
                case 'Digit4':
                    speed = 16;
                    break;
                case 'KeyW':
                    velocity.z = speed;
                    break;
                case 'KeyS':
                    velocity.z = -speed;
                    break;
                case 'KeyA':
                    velocity.x = -speed;
                    break;
                case 'KeyD':
                    velocity.x = speed;
                    break;
                case 'Space':
                    camera.position.y += 0.05 * speed;
                    break;
                case 'ControlLeft':
                    camera.position.y -= 0.05 * speed;
                    break;
                case 'ShiftLeft':
                    speed = 2;
                    break;
            }
        })

        document.addEventListener('keyup', event => {
            switch (event.code) {
                case 'KeyW':
                case 'KeyS':
                    velocity.z = 0;
                    break;
                case 'KeyA':
                case 'KeyD':
                    velocity.x = 0;
                    break;
                case 'ShiftLeft':
                    speed = 1;
                    break;
            }
        })
    }

    export function orbit(controls: OrbitControls) {
        controls.update();
    }
}


export class Particle {
    private _particle: Points;

    constructor(public count: number = 1000, private config?: { color: string }) {
        if (!config)
            this.config = { color: '#0xFFA500' };
    }

    get particle(): Points {
        if (!this._particle) {
            const geometry = new BufferGeometry();
            const positions = new Float32Array(this.count * 3);

            for (let i = 0; i < this.count; i++) {
                positions[i * 3] = Math.random() * 2 - 1;
                positions[i * 3 + 1] = Math.random() * 2 - 1;
                positions[i * 3 + 2] = Math.random() * 2 - 1;
            }

            geometry.setAttribute('position', new BufferAttribute(positions, 3));

            const material = new MeshStandardMaterial({
                color: this.config.color,
                side: 0.5,
                transparent: true,
                opacity: 0.8
            });

            this._particle = new Points(geometry, material);
        }

        return this._particle;
    }

    update() {
        console.log(this)
        const positions = this.particle.geometry.attributes.position.array;

        for (let i = 0; i < this.count; i++) {
            positions[i * 3 + 1] = Math.random() * 0.02;

            if (positions[i * 3 + 1] > 0.02) {
                positions[i * 3 + 1] = 0;
                positions[i * 3] = Math.random() * 2 - 1;
                positions[i * 3 + 2] = Math.random() * 2 - 1;
            }
        }

        this._particle.geometry.attributes.position.needsUpdate = true;
    }
}


export class Three {
    #scene: Scene = new Scene();
    #camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    #renderer: WebGLRenderer = new WebGLRenderer();
    #lights: Light[] = [];
    #actions: (() => void)[] = [];

    constructor(controls?: "Orb" | "Poi", light?: Light) {
        if (!(light instanceof Light)) {
            light = new DirectionalLight(0xffffff, 10)
            light.position.set(1, 1, 1)?.normalize();
            this.#lights.push(light);
        }

        switch (controls) {
            case "Orb":
                Tools.orbit(new OrbitControls(this.#camera, this.#renderer.domElement));
                break;
            case "Poi":
                const controls = new PointerLockControls(this.#camera, this.#renderer.domElement);
                const velocity = new Vector3();

                this.#actions.push(() => {
                    controls.moveRight(velocity.x * 0.01);
                    controls.moveForward(velocity.z * 0.01);
                })
                Tools.followMouse(controls);
                Tools.keyControl(velocity, this.#camera);
                break;
        }


        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderer.domElement);
        this.#camera.position.z = 5;
    }

    get acctions() { return this.#actions; }

    render(...args: (Mesh | Group | Light | Points | Promise<Group>)[]) {
        const [
            scene,
            camera,
            renderer,
            actions
        ] = [this.#scene, this.#camera, this.#renderer, this.#actions];

        this.#lights.forEach(light => { scene.add(light); });
        args.forEach(arg => {
            if (arg instanceof Promise)
                arg.then(group => scene.add(group))
            else
                scene.add(arg);
        });

        function _() {
            requestAnimationFrame(_);
            actions.forEach(action => { action(); });
            renderer.render(scene, camera);
        }

        _();
    }
}
