/*
 *
 * Framebuffer private header file for TI 81xx
 *
 * Copyright (C) 2009 TI
 * Author: Yihe Hu <yihehu@ti.com>
 *
 * Some code and ideas was from TI OMAP2 Driver by Tomi Valkeinen.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA	02111-1307, USA.
 */

#ifndef __DRIVERS_VIDEO_TI81XX_TI81XXFB_FBPRIV_H__
#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
#define __DRIVERS_VIDEO_TI81XX_TI81XXFB_FBPRIV_H__



#include "plat/ti81xx-vpss.h"

#define FB_DEBUG	0
#if FB_DEBUG
 #define dprintk(x...) printk(" [fb] " x)
#else
 #define dprintk(x...)
#endif
#define eprintk(x...) printk(" [fb-err] " x)

#define FB2TFB(fb_info) ((struct ti81xxfb_info *)(fb_info->par))

#define TI81XXFB_BPP	32
#define TI81XXFB_INVALID_OFFSET 0xFFFFFFFF
#define TI81XXFB_MAX_PRIORITY 0xF
#define TI81XXFB_MAX_GRPX_NUM	3		//# phoong


struct ti81xxfb_datamode {
	enum fvid2_dataformat           dataformat;
	u32                             bpp;
	u32                             nonstd;
	struct fb_bitfield              red;
	struct fb_bitfield              green;
	struct fb_bitfield              blue;
	struct fb_bitfield              transp;
};

struct ti81xxfb_alloc_list {
	struct list_head    list;
	dma_addr_t          phy_addr;
	void                *virt_addr;
	u32                 size;
	unsigned long       offset;
};


/**
 *	ti81xxfb_info
 *	  Define one ti81xxfb windows information
 *
 */
struct ti81xxfb_info {
	int                           idx;
	int                           enable;
	struct mutex                  rqueue_mutex;
	struct ti81xxfb_device        *fbdev;
	struct list_head              alloc_list;
	struct ti81xxfb_mem_region    mreg;
	struct vps_grpx_ctrl          *gctrl[TI81XXFB_MAX_GRPX_NUM];
	dma_addr_t                    pclut;
	void                          *vclut;
	enum ti81xxfb_data_format     pixfmt;
	u32                           pseudo_palette[16];
	enum ti81xxfb_mem_mode        mmode;
	unsigned long                 open_cnt;
	int							  num_use_grpx;		//# phoong
};

/**
 * ti81xxfb_device
 *	 Define the ti81xx fb device structure
 *
 */
struct ti81xxfb_device {
	struct device           *dev;
	struct fb_info          *fbs;
	int                     max_num_grpx;
};

int ti81xxfb_fbinfo_init(struct ti81xxfb_device *fbdev, struct fb_info *fbi);
int ti81xxfb_realloc_fbmem(struct fb_info *fbi, unsigned long size);
int ti81xxfb_create_sysfs(struct ti81xxfb_device *fbdev);
void ti81xxfb_remove_sysfs(struct ti81xxfb_device *fbdev);
int ti81xxfb_create_dccfg(struct fb_info *fbi);
int ti81xxfb_ioctl(struct fb_info *fbi, unsigned int cmd, unsigned long arg);
int ti81xxfb_release(struct fb_info *fbi, int user);

static inline void ti81xxfb_lock(struct ti81xxfb_info *tfbi)
{
	mutex_lock(&tfbi->rqueue_mutex);
}

static inline void ti81xxfb_unlock(struct ti81xxfb_info *tfbi)
{
	mutex_unlock(&tfbi->rqueue_mutex);
}

#ifdef __cplusplus
}
#endif /* __cplusplus */
#endif

