<?php get_header(); ?>
<div class="container">
	<div class="row">
		<div class="col-sm-8">
			<ol class="breadcrumb">
				<li><a href="<?php bloginfo('url'); ?>">首页</a></li>
				<li class="active"><?php the_title(); ?></li>
			</ol>
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<?php setPostViews(get_the_ID()); ?>
			<div id="content">
				<h1><?php the_title(); ?></h1>
				<div id="post-info">
					<ul class="list-inline">
						<?php the_tags('<li><i class="glyphicon glyphicon-tags"></i> ',',','</li>'); ?>
						<li><i class="glyphicon glyphicon-eye-open"></i> <a href="<?php the_permalink(); ?>" rel="nofollow"><?php echo getPostViews(get_the_ID()); ?></a></li>
						<li><i class="glyphicon glyphicon-comment"></i> <a href="<?php the_permalink(); ?>#comment" rel="nofollow"><?php comments_number('0', '1', '%' );?></a></li>
					</ul>
				</div>
				<?php the_content(); ?>
			</div>
			<?php endwhile; ?><?php endif; ?>
		</div>
		<?php get_sidebar(); ?>
	</div>
</div>
<?php get_footer(); ?>