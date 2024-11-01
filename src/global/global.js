export const MEASUREMENTS = {
    floor: {
        width: 20,
        height: 20,
        widthSegments: 100,
        heightSegments: 100
    },
    house: {
        walls: {
            width: 4,
            height: 2.5,
            depth: 4
        },
        roof: {
            radius: 3.5,
            height: 1.5,
            radialSegments: 4
        },
        door: {
            width: 2.2,
            height: 2
        },
        bushes: {
            radius: 1,
            heightSegments: 16,
            widthSegments: 16,
            config: [{
                position: [0.8, 0.2, 2.2],
                scale: 0.5
            },
            {
                position: [1.4, 0.1, 2.1],
                scale: 0.25
            },
            {
                position: [-0.8, 0.1, 2.2],
                scale: 0.4
            },
            {
                position: [-1, 0.05, 2.6],
                scale: 0.15
            },
            ]
        },
        graves: {
            width: 0.6,
            height: 0.8,
            depth: 0.2
        }
    }
}


export const TEXTURES = {
    floor: {
        alpha: './floor/alpha.webp',
        color: './floor/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp',
        arm: './floor/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp',
        normal: './floor/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp',
        displacement: './floor/leaves_forest_ground_1k/leaves_forest_ground_disp_1k.webp'
    },
    wall: {
        color: './wall/rough_plaster_brick_02_1k/rough_plaster_brick_02_diff_1k.webp',
        arm: './wall/rough_plaster_brick_02_1k/rough_plaster_brick_02_arm_1k.webp',
        normal: './wall/rough_plaster_brick_02_1k/rough_plaster_brick_02_nor_gl_1k.webp',
    },
    brush: {
        color: './brush/forest_leaves_02_1k/forest_leaves_02_diffuse_1k.webp',
        arm: './brush/forest_leaves_02_1k/forest_leaves_02_arm_1k.webp',
        normal: './brush/forest_leaves_02_1k/forest_leaves_02_nor_gl_1k.webp',
    },
    roof: {
        color: './roof/roof_tiles_14_1k/roof_tiles_14_diff_1k.webp',
        arm: './roof/roof_tiles_14_1k/roof_tiles_14_arm_1k.webp',
        normal: './roof/roof_tiles_14_1k/roof_tiles_14_nor_gl_1k.webp',
    },
    grave: {
        color: './grave/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp',
        arm: './grave/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp',
        normal: './grave/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp',
    },
    door: {
        color: './door/color.webp',
        alpha: './door/alpha.webp',
        ambientOcclusion: './door/ambientOcclusion.webp',
        height: './door/height.webp',
        normal: './door/normal.webp',
        metalness: './door/metalness.webp',
        roughness: './door/roughness.webp'
    }
}