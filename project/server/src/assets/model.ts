/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Group } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export class ModelLoader {
    #objLoader: OBJLoader = new OBJLoader();
    #mtlLoader: MTLLoader = new MTLLoader();
    #gltfLoader: GLTFLoader = new GLTFLoader();
    readonly #dirPath: string;

    constructor(private name: string, private type: string, baseURL: string = '/model') {
        this.#dirPath = `${baseURL}/${name}/`;
    }

    get objPath() { return `${this.#dirPath}model.obj`; }

    get mtlPath() { return `${this.#dirPath}model.mtl`; }

    get gltfPath() { return `${this.#dirPath}${this.name}.${this.type}`; }

    async load(): Promise<Group> {
        return new Promise((resolve, reject) => {
            switch (this.type) {
                case 'obj':
                    this.#mtlLoader.load(this.mtlPath, mater => {
                    mater.preload();
                    for (let key in mater.materials)
                        mater.materials[key].opacity = 1;

                    this.#objLoader.setMaterials(mater);
                    this.#objLoader.load(this.objPath, obj => {
                        resolve(obj);
                    })
                })
                    break;
                case 'gltf':
                case 'glb':
                    this.#gltfLoader.load(this.gltfPath, gltf => {

                        resolve(gltf.scene);
                        }, undefined, error => { console.error(error); reject(error);});
                    break;
                default:
                    reject(`Unsupported model type: ${this.type}`);
            }
        })
    }
}
