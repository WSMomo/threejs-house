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
        alpha: './floor/alpha.jpg',
        color: './floor/stone_tiles_03_1k/stone_tiles_03_diff_1k.jpg',
        arm: './floor/stone_tiles_03_1k/stone_tiles_03_arm_1k.jpg',
        normal: './floor/stone_tiles_03_1k/stone_tiles_03_nor_gl_1k.jpg',
        displacement: './floor/stone_tiles_03_1k/stone_tiles_03_disp_1k.jpg'
    },
    wall: {
        color: './wall/rough_plaster_brick_02_1k/rough_plaster_brick_02_diff_1k.jpg',
        arm: './wall/rough_plaster_brick_02_1k/rough_plaster_brick_02_arm_1k.jpg',
        normal: './wall/rough_plaster_brick_02_1k/rough_plaster_brick_02_nor_gl_1k.jpg',
    },
    brush: {
        color: './brush/forest_leaves_02_1k/forest_leaves_02_diffuse_1k.jpg',
        arm: './brush/forest_leaves_02_1k/forest_leaves_02_arm_1k.jpg',
        normal: './brush/forest_leaves_02_1k/forest_leaves_02_nor_gl_1k.jpg',
    },
    roof: {
        color: './roof/roof_tiles_14_1k/roof_tiles_14_diff_1k.jpg',
        arm: './roof/roof_tiles_14_1k/roof_tiles_14_arm_1k.jpg',
        normal: './roof/roof_tiles_14_1k/roof_tiles_14_nor_gl_1k.jpg',
    },
    grave: {
        color: './grave/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg',
        arm: './grave/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg',
        normal: './grave/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg',
    },
}