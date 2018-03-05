/*******************************************************************************
 *                                                                             *
 * Copyright (c) 2009 Texas Instruments Incorporated - http://www.ti.com/      *
 *                        ALL RIGHTS RESERVED                                  *
 *                                                                             *
 ******************************************************************************/

#ifndef _DEVICE_THSFILTERS_PRIV_H_
#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
#define _DEVICE_THSFILTERS_PRIV_H_


#include <osa_sem.h>
#include <osa_i2c.h>

typedef struct
{

    OSA_I2cHndl i2cHandle;

} Device_ThsCommonObj;

Device_ThsCommonObj gDevice_ThsCommonObj;

#ifdef __cplusplus
}
#endif /* __cplusplus */
#endif /*  _DEVICE_TVP5158_PRIV_H_  */
