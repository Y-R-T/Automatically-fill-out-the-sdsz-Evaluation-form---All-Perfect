// ==UserScript==
// @name         Auto Programme for SDSZ
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically evaluate items on service.sdsz.com.cn
// @author       YRT
// @match        https://service.sdsz.com.cn/fe-pc/b/galaxy-portal2/fe_evaluate_student/evaluate/*
// @grant        none
// ==/UserScript==

// 1.0: 原始版本
// 1.1: 加入确认框
// 1.2: 等待web加载

(function() {
    'use strict';

    async function processItems() {
        const targetItems = document.querySelectorAll('div.evaluate_targetItem');
        for (let item of targetItems) {
            item.click();
            await new Promise(resolve => setTimeout(resolve, 100));
            document.querySelectorAll('input[type="radio"][value="1"]').forEach(radio => {
                radio.click();
            });
            await new Promise(resolve => setTimeout(resolve, 100));
            const submitButton = document.querySelector('button.ant-btn.ant-btn-primary');
            submitButton.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    function waitForElements() {
        const observer = new MutationObserver((mutations, obs) => {
            if (document.querySelector('div.evaluate_targetItem')) {
                obs.disconnect();
                if (confirm('Do you want to automatically evaluate items?')) {
                    processItems();
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Run the function when the page is fully loaded, and watch for dynamic changes
    window.addEventListener('load', waitForElements);
})();
