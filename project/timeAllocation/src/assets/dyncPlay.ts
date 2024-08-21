/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, MeshBasicMaterial, BoxGeometry,
    Group, Light, CylinderGeometry, MeshStandardMaterial, PointLight, CircleGeometry, TextureLoader,
    DoubleSide, RepeatWrapping, Vector3, BufferGeometry, BufferAttribute, PlaneGeometry, MeshBasicMaterialParameters,
    MathUtils
} from 'three';
import { CSG } from "three-csg-ts";
import png from './clock.png';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'


export class ThreeD {
    private readonly renderer: WebGLRenderer = new WebGLRenderer();
    public geometryCache: Map<string, Mesh> = new Map();
    public events: (() => void)[] = [];

    constructor(
        private container: HTMLElement = document.body,
        public scene: Scene = new Scene(),
        public camera: PerspectiveCamera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000),
    ) {
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.container.append(this.renderer.domElement)
    }

    get stdClub(): Mesh {
        if (!this.geometryCache.has('club'))
            this.geometryCache.set('club', new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0x00ff00 })));
        return this.geometryCache.get('club');
    }

    union(outer: Mesh, inner: Mesh) {
        const result =  CSG.toMesh(CSG.fromMesh(outer).subtract(CSG.fromMesh(inner)), outer.matrix);
        result.material = outer.material;
        return result;
    }

    render(...target: (Mesh | Group | Light)[]) {
        const renderer = this.renderer;
        const scene = this.scene;
        const camera = this.camera;
        const events = this.events;

        target.forEach(item => { scene.add(item); });

        this.camera.position.z = 5;

        function _() {
            requestAnimationFrame(_);
            events.forEach(e => e())
            renderer.render(scene, camera);
        }
        _();
    }
}


export class Clock {
    public engine: ThreeD;
    public dial: Group;
    public axis: Mesh;
    public light: PointLight = new PointLight(0xC8C9A6, 10, 100, 2);
    public controls: PointerLockControls;
    public velocity = new Vector3();
    public needleMap: Map<string, Group> = new Map();
    private now = new Date();

    constructor(public container: HTMLElement, private debug: boolean = false) {
        this.engine = new ThreeD(container);
        this.controls = new PointerLockControls(this.engine.camera, container);
    }

    /** 绘制表盘 */
    drawDial() {
        const outer = new Mesh(
            new CylinderGeometry(3.5, 3.5, 0.3, 64),
            new MeshStandardMaterial({ color: 0xDFD833, metalness: 0.5, roughness: 0.5 })
        )

        const inner = new Mesh(
            new CylinderGeometry(3.4, 3.4, 0.3, 64),
            new MeshStandardMaterial({ color: 0x000000, metalness: 0.5, roughness: 0.5 })
        )

        const texture = new TextureLoader().load(png)
        texture.wrapT = RepeatWrapping;
        texture.wrapS = RepeatWrapping;
        texture.repeat.set(0.95, 0.95);
        texture.offset.set(0.025, 0.025);

        const bottom = new Mesh(
            new CircleGeometry(3.5, 64),
            new MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.5, roughness: 0.5, side: DoubleSide,
                map: texture
            })
        )

        inner.position.z = 0;

        const frame = this.engine.union(outer, inner);
        frame.rotation.x = Math.PI / 2;

        this.dial = new Group();
        this.dial.add(frame, bottom);
        this.dial.position.set(-0.025, 0.025, 0);

    }

    /* 绘制表轴 */
    drawAxis() {
        this.axis = new Mesh(
            new CylinderGeometry(0.05, 0.05, 0.125, 32),
            new MeshBasicMaterial({ color: 0x8F3A3A, metalness: 0.5, roughness: 0.5 })
        )

        this.axis.position.set(0, 0, 0.0625);
        this.axis.rotation.x = Math.PI / 2;
    }

    /* 绘制三针 */
    drawNeedle(name: string, config: {
        w: number, h: number, z: number,
        angle: number, offset: number,
        p?: MeshBasicMaterialParameters } = { w: 0.1, h: 1.8, p: null }, addition?: () => Math) {
        const needle = new Mesh(
            new PlaneGeometry(config.w, config.h),
            new MeshBasicMaterial(config.p || { color: 0x000000, metalness: 0.9, roughness: 0.5 })
        )

        const pivot = new Group();
        needle.position.set(0, config.offset, 0.0416 * config.z);
        pivot.add(needle);

        if (addition) {
            const add = addition();
            add.position.z = 0.0416 * config.z;
            pivot.add(add);
        }

        pivot.rotation.z = config.angle;

        this.needleMap.set(name, pivot);
    }

    followMouse() {
        document.addEventListener('click', () => { this.controls.lock() })
    }

    keyControl() {
        document.addEventListener('keydown', event => {
            switch (event.code) {
                case 'KeyW':
                    this.velocity.z = 1;
                    break;
                case 'KeyS':
                    this.velocity.z = -1;
                    break;
                case 'KeyA':
                    this.velocity.x = -1;
                    break;
                case 'KeyD':
                    this.velocity.x = 1;
                    break;
            }
        })

        document.addEventListener('keyup', event => {
            switch (event.code) {
                case 'KeyW':
                case 'KeyS':
                    this.velocity.z = 0;
                    break;
                case 'KeyA':
                case 'KeyD':
                    this.velocity.x = 0;
                    break;
            }
        })
    }

    render() {
        if (this.debug) {
            this.followMouse();
            this.keyControl();
        }
        this.engine.events.push(() => {
            this.controls.moveRight(this.velocity.x * 0.01);
            this.controls.moveForward(this.velocity.z * 0.01);
        })

        this.drawDial();
        this.drawAxis();

        const hour = this.now.getHours();
        const minute = this.now.getMinutes();
        const second = this.now.getSeconds();

        this.drawNeedle('hour', { w: 0.1, h: 2.4, z: 1, angle: -MathUtils.degToRad((hour % 12 + minute / 60) * 30), offset: 0.6});
        this.drawNeedle('minute', { w: 0.1, h: 3.2, z: 2, angle: -MathUtils.degToRad(minute * 6), offset: 0.8});
        this.drawNeedle('second', { w: 0.05, h: 2.4, z: 3, angle: -MathUtils.degToRad(second * 6), offset: 1,
            p: { color: 0x8F3A3A, metalness: 0.1, roughness: 0.1, side: DoubleSide }}, () => {
            const tail = new Mesh(
                new PlaneGeometry(0.1, 0.6),
                new MeshBasicMaterial({ color: 0x8F3A3A, metalness: 0.5, roughness: 0.5 })
            )
            tail.position.set(0, -0.5, 0.0416);
            return tail;
        });
        this.light.position.set(0, 0, 10);
        this.engine.camera.position.z = 10;
        this.engine.render(this.dial, this.axis, this.needleMap.get('hour')!, this.needleMap.get('minute')!, this.needleMap.get('second')!, this.light);
    }

}
