/*******************************************************************************
 *                                                                             *
 * Copyright (c) 2009 Texas Instruments Incorporated - http://www.ti.com/      *
 *                        ALL RIGHTS RESERVED                                  *
 *                                                                             *
 ******************************************************************************/

#include <mcfw/src_bios6/utils/utils.h>
#include <mcfw/interfaces/link_api/system.h>
#include <mcfw/src_bios6/links_common/system/system_priv_common.h>


Int32 System_start(Task_FuncPtr chainsMainFunc);
Void System_procStart();
Void System_procStop();

Void C6XDSP_main(UArg arg0, UArg arg1)
{
    char ch;
    while (1)
    {
        Task_sleep(100);
        Utils_getChar(&ch, BIOS_NO_WAIT);
        if (ch == 'x')
            break;
        if (ch == 'T')
            System_procStart();
        if (ch == 'P')
            System_procStop();			
    }
}
Int32 main(void)
{
#if 0
	char ch=0;

	do{
	}while(!ch);
#endif
	Utils_setCpuFrequency(SYSTEM_DSP_FREQ);
    System_start(C6XDSP_main);
    BIOS_start();

    return (0);
}
