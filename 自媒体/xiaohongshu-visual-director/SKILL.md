---
name: xiaohongshu-visual-director
description: Use when planning Xiaohongshu or self-media visual content, coordinating article structure, image cards, cover direction, channel adaptation, or an end-to-end publishing package.
---

# 小红书视觉策划总导演

## 核心原则

先定传播任务和视觉叙事，再拆文案、图卡、封面和渠道改写。不要把小红书内容当成普通长文搬运；每一张图、每一个标题和每个 CTA 都要服务同一个用户动作。

## 使用时机

- 用户要做小红书笔记、种草文、活动宣传、产品介绍、校园运营内容。
- 用户给了草稿、链接、资料包，希望变成可发布内容。
- 用户要同时产出文章结构、图卡、封面方向、公众号或微博版本。
- 需要总导演视角统一口吻、视觉、转化目标和发布节奏。

## 标准流程

1. 明确目标：发布平台、目标用户、转化动作、不可碰的红线。
2. 如果输入是 URL 或外部文章，先使用 `url-to-markdown-rewriter` 提取事实、结构和可复用观点。
3. 给出总导演 Brief：一句话定位、用户钩子、内容主线、视觉关键词、素材需求、风险边界。
4. 用 `publishable-article-structurer` 把草稿整理成可发布文章结构。
5. 用 `social-card-splitter` 把核心内容拆成图卡脚本。
6. 用 `article-cover-director` 生成封面方向、封面文案和图片生成提示词。
7. 需要公众号、微博时，用 `wechat-weibo-adapter` 分别改写，保留平台差异。
8. 最后做发布前检查：事实来源、隐私、安全、平台合规、语气、CTA、素材缺口。

## 总导演 Brief 模板

```md
## 总导演 Brief

- 传播目标：
- 目标用户：
- 核心洞察：
- 一句话定位：
- 主标题方向：
- 视觉方向：
- 内容主线：
- 必备素材：
- 转化动作：
- 风险边界：
- 下游 Skill：
```

## 质量门槛

- 封面必须一眼说明主题，不能只做气氛图。
- 图卡必须一张一个信息点，前后有递进关系。
- 文案不能伪造真实数据、用户反馈、平台规则或第三方评价。
- 涉及校园交友、个人信息、情感关系时，优先保护隐私和信任。
- 不做刷量、抄袭、搬运、诱导互动或绕过平台风控的建议。
